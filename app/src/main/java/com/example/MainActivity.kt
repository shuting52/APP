package com.example

import android.annotation.SuppressLint
import android.content.Intent
import android.os.Bundle
import android.view.View
import android.view.ViewGroup
import android.webkit.SslErrorHandler
import android.webkit.WebResourceError
import android.webkit.WebResourceRequest
import android.webkit.WebResourceResponse
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.activity.ComponentActivity
import androidx.activity.compose.BackHandler
import androidx.activity.compose.setContent
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.runtime.Composable
import androidx.compose.runtime.DisposableEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.viewinterop.AndroidView
import androidx.core.view.WindowCompat
import androidx.core.view.WindowInsetsCompat
import androidx.core.view.WindowInsetsControllerCompat
import androidx.webkit.WebViewAssetLoader
import java.io.ByteArrayInputStream
import java.io.File
import java.net.HttpURLConnection
import java.net.URL
import java.security.SecureRandom
import java.security.cert.X509Certificate
import javax.net.ssl.HostnameVerifier
import javax.net.ssl.HttpsURLConnection
import javax.net.ssl.SSLContext
import javax.net.ssl.SSLSocketFactory
import javax.net.ssl.TrustManager
import javax.net.ssl.X509TrustManager

class MainActivity : ComponentActivity() {

  companion object {
    init {
      try {
        android.system.Os.setenv("LIBGL_ALWAYS_SOFTWARE", "1", true)
      } catch (_: Throwable) {}
    }
  }

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    ensureWebViewCacheDirs()
    setupFullScreen()

    setContent {
      FullscreenWebApp(activity = this)
    }
  }

  override fun onWindowFocusChanged(hasFocus: Boolean) {
    super.onWindowFocusChanged(hasFocus)
    if (hasFocus) {
      setupFullScreen()
    }
  }

  private fun ensureWebViewCacheDirs() {
    try {
      val base = cacheDir
      val jsCache = File(base, "WebView/Default/HTTP Cache/Code Cache/js")
      if (!jsCache.exists()) {
        jsCache.mkdirs()
      }
      val wasmCache = File(base, "WebView/Default/HTTP Cache/Code Cache/wasm")
      if (!wasmCache.exists()) {
        wasmCache.mkdirs()
      }
    } catch (_: Exception) {}
  }

  private fun setupFullScreen() {
    WindowCompat.setDecorFitsSystemWindows(window, false)
    val controller = WindowCompat.getInsetsController(window, window.decorView)
    controller.systemBarsBehavior =
      WindowInsetsControllerCompat.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE
    controller.hide(WindowInsetsCompat.Type.systemBars())
  }
}

private val permissiveSslSocketFactory: SSLSocketFactory? by lazy {
  try {
    val trustAllCerts = arrayOf<TrustManager>(object : X509TrustManager {
      override fun checkClientTrusted(chain: Array<X509Certificate>?, authType: String?) {}
      override fun checkServerTrusted(chain: Array<X509Certificate>?, authType: String?) {}
      override fun getAcceptedIssuers(): Array<X509Certificate> = arrayOf()
    })
    val sslContext = SSLContext.getInstance("TLS")
    sslContext.init(null, trustAllCerts, SecureRandom())
    sslContext.socketFactory
  } catch (_: Exception) {
    null
  }
}

@SuppressLint("SetJavaScriptEnabled", "ClickableViewAccessibility")
@Composable
fun FullscreenWebApp(activity: ComponentActivity) {
  var webViewInstance by remember { mutableStateOf<WebView?>(null) }
  var canGoBack by remember { mutableStateOf(false) }

  BackHandler(enabled = canGoBack) {
    webViewInstance?.let { webView ->
      if (webView.canGoBack()) {
        webView.goBack()
      }
    }
  }

  DisposableEffect(Unit) {
    onDispose {
      webViewInstance?.destroy()
    }
  }

  Box(
    modifier = Modifier
      .fillMaxSize()
      .background(Color(0xFFE0F2FE))
      .testTag("fullscreen_container")
  ) {
    AndroidView(
      modifier = Modifier
        .fillMaxSize()
        .testTag("app_webview"),
      factory = { context ->
        val assetLoader = WebViewAssetLoader.Builder()
          .addPathHandler("/assets/", WebViewAssetLoader.AssetsPathHandler(context))
          .build()

        WebView(context).apply {
          setBackgroundColor(android.graphics.Color.parseColor("#E0F2FE"))
          layoutParams = ViewGroup.LayoutParams(
            ViewGroup.LayoutParams.MATCH_PARENT,
            ViewGroup.LayoutParams.MATCH_PARENT
          )

          // 核心特性：全屏无边框、彻底禁止左右滑动回弹/越界
          overScrollMode = View.OVER_SCROLL_NEVER
          isHorizontalScrollBarEnabled = false
          isVerticalScrollBarEnabled = false

          // 拦截父视图横向手势，确保在 APK 内部不触发系统或外层左右滑动
          setOnTouchListener { v, _ ->
            v.parent?.requestDisallowInterceptTouchEvent(true)
            false
          }

          settings.apply {
            javaScriptEnabled = true
            domStorageEnabled = true
            databaseEnabled = true
            allowFileAccess = true
            allowContentAccess = true
            useWideViewPort = true
            loadWithOverviewMode = true
            setSupportZoom(false)
            builtInZoomControls = false
            displayZoomControls = false
            cacheMode = WebSettings.LOAD_NO_CACHE
            mixedContentMode = WebSettings.MIXED_CONTENT_ALWAYS_ALLOW
          }

          webViewClient = object : WebViewClient() {
            override fun shouldInterceptRequest(
              view: WebView,
              request: WebResourceRequest
            ): WebResourceResponse? {
              val uri = request.url
              if (uri.host == "appassets.androidplatform.net") {
                return assetLoader.shouldInterceptRequest(uri)
              }

              // Intercept external subresource requests (favicons, images) so Chromium's native C++ SSL socket doesn't fail on year 2026 certificate dates
              val scheme = uri.scheme?.lowercase()
              if (scheme == "https" || scheme == "http") {
                return try {
                  val connection = (URL(uri.toString()).openConnection() as HttpURLConnection).apply {
                    connectTimeout = 3000
                    readTimeout = 3000
                    instanceFollowRedirects = true
                    if (this is HttpsURLConnection) {
                      permissiveSslSocketFactory?.let { sslSocketFactory = it }
                      hostnameVerifier = HostnameVerifier { _, _ -> true }
                    }
                  }
                  val contentType = connection.contentType ?: "image/png"
                  val mimeType = contentType.substringBefore(";").trim()
                  val encoding = if (contentType.contains("charset=")) {
                    contentType.substringAfter("charset=").substringBefore(";").trim()
                  } else "UTF-8"
                  WebResourceResponse(mimeType, encoding, connection.inputStream)
                } catch (_: Exception) {
                  WebResourceResponse(
                    "image/png",
                    "UTF-8",
                    204,
                    "No Content",
                    emptyMap(),
                    ByteArrayInputStream(ByteArray(0))
                  )
                }
              }

              return null
            }

            override fun shouldOverrideUrlLoading(
              view: WebView,
              request: WebResourceRequest
            ): Boolean {
              val url = request.url.toString()
              // 内部资产及本地页面在 WebView 内浏览
              if (url.startsWith("https://appassets.androidplatform.net") ||
                url.startsWith("file:///android_asset")
              ) {
                return false
              }
              // 外部资源/导航卡片链接跳转系统浏览器打开，保证最佳用户体验
              return try {
                val intent = Intent(Intent.ACTION_VIEW, request.url)
                context.startActivity(intent)
                true
              } catch (_: Exception) {
                false
              }
            }

            override fun onReceivedSslError(
              view: WebView,
              handler: SslErrorHandler,
              error: android.net.http.SslError
            ) {
              handler.proceed()
            }

            override fun onReceivedError(
              view: WebView,
              request: WebResourceRequest,
              error: WebResourceError
            ) {
              super.onReceivedError(view, request, error)
            }

            override fun onPageFinished(view: WebView, url: String?) {
              super.onPageFinished(view, url)
              canGoBack = view.canGoBack()
            }
          }

          // 加载打包在 assets 中的应用首页
          loadUrl("https://appassets.androidplatform.net/assets/web/index.html")
          webViewInstance = this
        }
      },
      update = {
        canGoBack = it.canGoBack()
      }
    )
  }
}
