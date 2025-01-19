import {
  LandingContainer,
  LandingCTA,
  LandingFAQ,
  LandingFeatures,
  LandingHero,
  LandingHowItWorks,
  LandingPainPoints,
  LandingPricing,
  LandingSocialProof,
  LandingSocialRating,
  LandingTestimonials,
} from '~/designSystem'

export default function LandingPage() {
  const features = [
    {
      heading: `Custom Design Marketplace`,
      description: `Connect with talented designers and get unique pieces made just for you. Express your personal style with custom clothing that fits perfectly.`,
      icon: <i className="las la-tshirt"></i>,
    },
    {
      heading: `Local Tailoring Network`,
      description: `Find skilled tailors in your area for alterations and custom fits. Book appointments and track orders seamlessly.`,
      icon: <i className="las la-cut"></i>,
    },
    {
      heading: `Sustainable Fashion`,
      description: `Donate pre-loved clothes and earn Kindness Points. Make a positive impact while refreshing your wardrobe.`,
      icon: <i className="las la-leaf"></i>,
    },
    {
      heading: `Real-time Communication`,
      description: `Chat directly with designers and tailors to bring your vision to life. Share ideas, measurements, and updates instantly.`,
      icon: <i className="las la-comments"></i>,
    },
    {
      heading: `Secure Payments`,
      description: `Shop with confidence using our protected payment system. Pay only when you're completely satisfied.`,
      icon: <i className="las la-lock"></i>,
    },
    {
      heading: `Order Tracking`,
      description: `Follow your custom pieces from design to delivery. Get notifications at every step of the creation process.`,
      icon: <i className="las la-shipping-fast"></i>,
    },
  ]

  const testimonials = [
    {
      name: `Sarah Chen`,
      designation: `Fashion Enthusiast`,
      content: `Craftrella transformed my wardrobe! I now have unique pieces that perfectly fit my style and body. The tailors are incredibly skilled and the designers truly understand what I want.`,
      avatar: 'https://randomuser.me/api/portraits/women/6.jpg',
    },
    {
      name: `Marcus Rodriguez`,
      designation: `Sustainable Fashion Advocate`,
      content: `The donation feature is brilliant! I've earned so many Kindness Points while decluttering my closet. It feels great knowing my clothes are getting a second life.`,
      avatar: 'https://randomuser.me/api/portraits/men/7.jpg',
    },
    {
      name: `Emily Thompson`,
      designation: `Professional Stylist`,
      content: `As a stylist, I recommend Craftrella to all my clients. The platform makes custom fashion accessible and the quality of work from the tailors is exceptional.`,
      avatar: 'https://randomuser.me/api/portraits/women/27.jpg',
    },
  ]

  const navItems = [
    {
      title: `Features`,
      link: `#features`,
    },
    {
      title: `Pricing`,
      link: `#pricing`,
    },
    {
      title: `FAQ`,
      link: `#faq`,
    },
  ]

  const packages = [
    {
      title: `Fashion Explorer`,
      description: `Perfect for those starting their custom fashion journey`,
      monthly: 9.99,
      yearly: 99,
      features: [
        `Access to marketplace`,
        `Basic order tracking`,
        `Community features`,
      ],
    },
    {
      title: `Style Creator`,
      description: `For fashion enthusiasts who want the full experience`,
      monthly: 24.99,
      yearly: 249,
      features: [
        `Priority access to designers`,
        `Advanced customization tools`,
        `Unlimited alterations`,
        `VIP customer support`,
      ],
      highlight: true,
    },
    {
      title: `Fashion Professional`,
      description: `Complete solution for style professionals`,
      monthly: 49.99,
      yearly: 499,
      features: [
        `Business profile`,
        `Client management`,
        `Analytics dashboard`,
        `Marketing tools`,
      ],
    },
  ]

  const questionAnswers = [
    {
      question: `How does the custom design process work?`,
      answer: `Simply browse our marketplace, connect with a designer, share your vision, and they'll create a unique piece just for you. You can track progress and communicate directly throughout the process.`,
    },
    {
      question: `What is the Kindness Points system?`,
      answer: `Kindness Points are earned when you donate clothes through our platform. These points can be used for discounts on future purchases or alterations.`,
    },
    {
      question: `How do I find a local tailor?`,
      answer: `Our platform shows you verified tailors in your area, complete with reviews, specialties, and availability. Book appointments directly through the app.`,
    },
    {
      question: `What's your refund policy?`,
      answer: `We offer a 100% satisfaction guarantee. If you're not happy with your custom piece, we'll work with the designer or tailor to make it right.`,
    },
  ]

  const steps = [
    {
      heading: `Create Your Profile`,
      description: `Sign up and share your style preferences and measurements.`,
    },
    {
      heading: `Connect with Creators`,
      description: `Browse and connect with designers and tailors who match your style.`,
    },
    {
      heading: `Bring Your Vision to Life`,
      description: `Work directly with professionals to create or alter your perfect pieces.`,
    },
    {
      heading: `Wear and Share`,
      description: `Enjoy your custom fashion and earn points by donating pre-loved items.`,
    },
  ]

  const painPoints = [
    {
      emoji: `😫`,
      title: `Frustrated with ill-fitting mass-produced clothing`,
    },
    {
      emoji: `🏃‍♀️`,
      title: `Wasting time searching for reliable tailors`,
    },
    {
      emoji: `💔`,
      title: `Disappointed by fast fashion quality and sustainability`,
    },
  ]

  return (
    <LandingContainer navItems={navItems}>
      <LandingHero
        title={`Your Dream Wardrobe, Perfectly Tailored to You`}
        subtitle={`Join the fashion revolution where custom designs meet sustainable style. Connect with local tailors and designers to create clothing that's uniquely yours.`}
        buttonText={`Start Your Style Journey`}
        pictureUrl={`https://marblism-dashboard-api--production-public.s3.us-west-1.amazonaws.com/ZHDoQH-craftrella-QZoB`}
        socialProof={
          <LandingSocialRating
            numberOfUsers={5000}
            suffixText={`fashion enthusiasts already creating their dream wardrobe`}
          />
        }
      />
      <LandingSocialProof title={`Featured in Fashion Media`} />
      <LandingPainPoints
        title={`92 million tons of textile waste created annually - It's time for a change`}
        painPoints={painPoints}
      />
      <LandingHowItWorks
        title={`Your Journey to Sustainable Style`}
        steps={steps}
      />
      <LandingFeatures
        id="features"
        title={`Transform Your Fashion Experience`}
        subtitle={`Everything you need to create your perfect wardrobe while supporting sustainable fashion`}
        features={features}
      />
      <LandingTestimonials
        title={`Join Thousands of Happy Fashion Enthusiasts`}
        subtitle={`See how Craftrella is changing the way people approach fashion`}
        testimonials={testimonials}
      />
      <LandingPricing
        id="pricing"
        title={`Invest in Your Style, Invest in Sustainability`}
        subtitle={`Choose the perfect plan for your fashion journey`}
        packages={packages}
      />
      <LandingFAQ
        id="faq"
        title={`Everything You Need to Know`}
        subtitle={`Common questions about creating your custom wardrobe`}
        questionAnswers={questionAnswers}
      />
      <LandingCTA
        title={`Ready to Transform Your Wardrobe?`}
        subtitle={`Join Craftrella today and start creating clothing that truly reflects who you are.`}
        buttonText={`Create Your Account`}
        buttonLink={`/register`}
      />
    </LandingContainer>
  )
}
