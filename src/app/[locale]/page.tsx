import {getTranslations} from 'next-intl/server';
import LocaleSwitcher from '@/components/layout/LocaleSwitcher';

export default async function HomePage() {
  const tNav = await getTranslations('nav');
  const tHero = await getTranslations('hero');
  const tAbout = await getTranslations('about');
  const tPortfolio = await getTranslations('portfolio');
  const tFooter = await getTranslations('footer');

  return (
    <>
      <header className="site-header">
        <div className="container nav-row">
          <nav className="nav" aria-label="Main navigation">
            <a href="#home">{tNav('home')}</a>
            <a href="#about">{tNav('about')}</a>
            <a href="#portfolio">{tNav('portfolio')}</a>
            <a href="#instagram">{tNav('instagram')}</a>
          </nav>

          <LocaleSwitcher />
        </div>
      </header>

      <main>
        <section id="home" className="section hero">
          <div className="container">
            <p className="eyebrow">{tHero('title')}</p>
            <h1>{tHero('name')}</h1>
            <p className="lead">{tHero('subtitle')}</p>
          </div>
        </section>

        <section id="about" className="section">
          <div className="container narrow">
            <h2>{tAbout('title')}</h2>
            <p>{tAbout('text')}</p>
          </div>
        </section>

        <section id="portfolio" className="section">
          <div className="container narrow">
            <h2>{tPortfolio('title')}</h2>
            <div className="card-list">
              <article className="card">
                <h3>{tPortfolio('creativeDirection')}</h3>
              </article>
              <article className="card">
                <h3>{tPortfolio('showreel')}</h3>
              </article>
              <article className="card">
                <h3>{tPortfolio('aiVideo')}</h3>
              </article>
            </div>
          </div>
        </section>

        <section id="instagram" className="section">
          <div className="container narrow">
            <h2>{tPortfolio('instagram')}</h2>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container">
          <p>{tFooter('copyright')}</p>
        </div>
      </footer>
    </>
  );
}
