import { create } from 'zustand';

interface RedirectState {
  linkName: string;
  setLinkName: (linkName: string) => void;
}


// 공통 영역에 해당 state를 감시하게 해놓고 변경 되면 변경된 값으로 리다이렉트 처리
// 그냥 라우터로 보내도 되지만 라우터는 훅이므로 훅 사용 불가능 한 경우에 해당 방법 사용
// 사용 방법은 이동하고싶은 경로만 셋해주면됨
export const useRedirectStore = create<RedirectState>((set) => ({
  linkName: '',
  setLinkName: (linkName) => set({ linkName }),
}));
