'use client';

import { useRouter, usePathname } from 'next/navigation';
import DarkModeToggle from '../DarkModeToggle';
import { useAuthStore } from '@/store/authStore';
import { getTitleFromPath } from '@/utils/utils';
import LevelSelector from '../LevelSelector';
import { LogOut, Star, User, BookCheck, BookOpen } from 'lucide-react';
import { IconBtn } from '../ui/IconBtn';



interface HeaderProps {
  showBackButton?: boolean;
  // title?: string;
}

export default function Header({ showBackButton = false }: HeaderProps) {
  const router = useRouter();
  const path = usePathname();

  const accessToken = useAuthStore((state) => state.accessToken);
  const { performLogout } = useAuthStore();

  const showHeader = true;
  const showLevel = path !== '/register' && path !== '/profile';
  const title = getTitleFromPath(path);
  
  const handleLogout = async () => {
    await performLogout();
  };

  return (
    showHeader && (
    <header className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-sm z-50">
      <div className="max-w-4xl mx-auto px-2 sm:px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-4 min-w-0">
          {showBackButton && (
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors shrink-0"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          <h1 className="text-base sm:text-xl font-semibold text-gray-800 dark:text-white truncate">
            {title}
          </h1>
        </div>

        <div className="flex items-center gap-1 sm:gap-3 flex-wrap justify-end max-w-[70%] sm:max-w-none">
          <DarkModeToggle />
          {accessToken && (
            <>
              <IconBtn onClick={() => router.push('/')} icon={<BookOpen />} title="오늘의단어" />
              <IconBtn onClick={() => router.push('/flashcard')} icon={<BookCheck />} title="깜빡이학습" />
              <IconBtn onClick={() => router.push('/favorites')} icon={<Star />} title="즐겨찾기" />
              <IconBtn onClick={() => router.push('/profile')} icon={<User />} title="프로필" />
              <IconBtn onClick={handleLogout} icon={<LogOut />} title="로그아웃" />
            </>
          )}
        </div>
      </div>
      {
        showLevel && (
          <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          {showLevel && <LevelSelector />}
        </div>
        )
      }
    </header>
    )
  );
} 