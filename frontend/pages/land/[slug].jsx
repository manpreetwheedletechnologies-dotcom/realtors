import Head from 'next/head';

import LandPageHero from '../../components/land-components/LandPageHero';
import StatsStrip from '../../components/land-components/StatsStrip';
import Features from '../../components/land-components/Features';
import VerificationJourney from '../../components/land-components/VerificationJourney';
import FeaturedPlots from '../../components/land-components/FeaturedPlots';
import FaqSection from '../../components/land-components/FaqSection';
import FinalCta from '../../components/land-components/FinalCta';

import { getAllLandSlugs, getLandBySlug } from '../../lib/lands';

/* ------------------------------------------------------------------ */
/* Static generation — one page per key in data/lands.json            */
/* ------------------------------------------------------------------ */

export const getStaticPaths = () => {
  const slugs = getAllLandSlugs();
  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: false
  };
};

export const getStaticProps = async ({ params }) => {
  const land = getLandBySlug(params.slug);

  if (!land) {
    return { notFound: true };
  }

  return { props: { land, slug: params.slug } };
};

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function LandPage({ land, slug }) {
  return (
    <>
      <Head>
        <title>{land.meta.title}</title>
        <meta name="description" content={land.meta.description} />
      </Head>

      {/*
        key={slug} forces React to fully unmount + remount this entire
        tree whenever the land type changes (e.g. residential -> commercial
        via client-side <Link> navigation). Without this, Next.js reuses
        the same component instances across the route change, which
        leaves stale local state (FAQ open/closed, card image index) and —
        critically — breaks framer-motion's whileInView scroll animations,
        since their IntersectionObservers don't always re-fire on content
        swapped into already-mounted DOM. That's why cards appeared
        "missing" on soft navigation but always showed up on hard refresh
        (which naturally remounts everything).
      */}
      <main key={slug} className="min-h-screen bg-white text-gray-800">
        <LandPageHero
          image={land.hero.image}
          badge={land.hero.badge}
          titleLine1={land.hero.titleLine1}
          titleLine2={land.hero.titleLine2}
          subtitle={land.hero.subtitle}
        />

        <StatsStrip stats={land.stats} />

        <Features data={land.features} />

        <VerificationJourney data={land.journey} />

        <FeaturedPlots data={land.plots} />

        <FaqSection data={land.faq} />

        <FinalCta data={land.cta} />
      </main>
    </>
  );
}