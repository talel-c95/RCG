import { useRouter } from 'next/navigation';

export const useNavigation = () => {
  const router = useRouter();

  const handleNavigation = (href: string) => {
    if (href.startsWith('#')) {
      // Navigate to main page first, then scroll to section
      router.push('/');
      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        } else {
          // If element not found, try again after a bit more time
          setTimeout(() => {
            const element = document.querySelector(href);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
          }, 200);
        }
      }, 300);
    } else {
      // Direct page navigation
      router.push(href);
    }
  };

  return { handleNavigation };
};
