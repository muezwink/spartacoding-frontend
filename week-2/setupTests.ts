import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Vitest에서 사용할 글로벌 설정을 추가합니다
window.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));
