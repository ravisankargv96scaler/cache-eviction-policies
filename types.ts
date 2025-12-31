export interface CacheItem {
  id: string;
  value: string;
  type: 'default' | 'hot' | 'cold' | 'new' | 'evicting';
  count?: number; // For LFU
  timestamp?: number; // For LRU internal tracking
}

export type TabId = 'problem' | 'fifo' | 'lru' | 'lfu' | 'edge' | 'quiz';

export interface TabConfig {
  id: TabId;
  label: string;
  title: string;
  description: string;
}
