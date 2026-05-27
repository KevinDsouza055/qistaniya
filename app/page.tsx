import HeroSection from '@/components/sections/HeroSection';
import StorySection from '@/components/sections/StorySection';
import FeaturedMenu from '@/components/sections/FeaturedMenu';
import ReviewsSection from '@/components/sections/ReviewsSection';
import CTASection from '@/components/sections/CTASection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <StorySection />
      <FeaturedMenu />
      <ReviewsSection />
      <CTASection />
    </>
  );
}
