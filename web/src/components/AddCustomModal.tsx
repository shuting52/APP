import React, { useState } from 'react';
import { X, Globe, Tag, Sparkles } from 'lucide-react';
import { NavCard } from '../types';

interface AddCustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (newCard: NavCard) => void;
}

export const AddCustomModal: React.FC<AddCustomModalProps> = ({
  isOpen,
  onClose,
  onAdd
}) => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [category, setCategory] = useState('custom');
  const [desc, setDesc] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !url.trim()) return;

    let finalUrl = url.trim();
    if (!/^https?:\/\//i.test(finalUrl)) {
      finalUrl = 'https://' + finalUrl;
    }

    let domain = '';
    try {
      domain = new URL(finalUrl).hostname;
    } catch {
      domain = '';
    }

    const newCard: NavCard = {
      id: `custom-${Date.now()}`,
      title: title.trim(),
      url: finalUrl,
      fallbackDomain: domain,
      fallbackText: title.trim().slice(0, 1),
      subcatId: category,
      desc: desc.trim(),
      isCustom: true
    };

    onAdd(newCard);
    setTitle('');
    setUrl('');
    setDesc('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[var(--iiice-white)] border border-[var(--iiice-border)] rounded-2xl w-full max-w-md p-5 shadow-2xl relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <div className="w-9 h-9 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[var(--iiice-title)]">添加自建网站</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">保存在您的本地浏览器中，随时快速直达</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              网站名称 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="例如：我的工作台 / 内部系统"
              className="w-full px-3 py-2 text-xs rounded-lg border border-[var(--iiice-border)] bg-[var(--search-input-bg)] text-[var(--iiice-title)] focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              网站网址 (URL) <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="例如：my-dashboard.com 或 https://..."
                className="w-full pl-8 pr-3 py-2 text-xs rounded-lg border border-[var(--iiice-border)] bg-[var(--search-input-bg)] text-[var(--iiice-title)] focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Globe className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              所属分类
            </label>
            <div className="relative">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full pl-8 pr-3 py-2 text-xs rounded-lg border border-[var(--iiice-border)] bg-[var(--search-input-bg)] text-[var(--iiice-title)] focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                <option value="custom">我的收藏夹</option>
                <option value="work">工作必备</option>
                <option value="tool">实用工具</option>
                <option value="study">学习资料</option>
              </select>
              <Tag className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              备注说明 (选填)
            </label>
            <input
              type="text"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="简短描述该网站用途..."
              className="w-full px-3 py-2 text-xs rounded-lg border border-[var(--iiice-border)] bg-[var(--search-input-bg)] text-[var(--iiice-title)] focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              取消
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors cursor-pointer shadow-sm"
            >
              保存并添加
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
