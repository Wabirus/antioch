import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Mission from '@/components/Mission';
import Services from '@/components/Services';
import Events from '@/components/Events';
import FeaturedSermon from '@/components/FeaturedSermon';
import LiveStreams from '@/components/LiveStreams';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Mission />
        <Services />
        <Events />
        <FeaturedSermon />
        <LiveStreams />
        <section id="contact">
          <div className="container">
            <div className="section-title">
              <h2>Get In Touch</h2>
              <p>We'd love to hear from you. Reach out with any questions or prayer requests.</p>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
