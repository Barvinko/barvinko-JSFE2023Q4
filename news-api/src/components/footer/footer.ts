import './footer.css';
import { TryNull } from '../../library/types';
import rssImage from '../../assets/img/rss.svg';

class Footer {
    private readonly _footer: TryNull<HTMLElement>;
    constructor() {
        this._footer = document.querySelector('footer') || null;
    }

    private createRssLink(): HTMLAnchorElement {
        const rssLink: HTMLAnchorElement = document.createElement('a');
        rssLink.href = 'https://rs.school/js/';
        rssLink.target = '_blank';

        const logo: HTMLImageElement = document.createElement('img');
        logo.className = 'footer__logo';
        logo.src = rssImage;
        logo.alt = 'RSS';

        rssLink.appendChild(logo);

        return rssLink;
    }

    private createOtherLinksContainer(): HTMLDivElement {
        const otherLinks: HTMLDivElement = document.createElement('div');
        otherLinks.className = 'footer__container-link';

        return otherLinks;
    }

    private createGitHubLink(): HTMLAnchorElement {
        const gitHubLink: HTMLAnchorElement = document.createElement('a');
        gitHubLink.innerText = 'GitHub - Barvinko';
        gitHubLink.className = 'footer__git-hub';
        gitHubLink.href = 'https://github.com/Barvinko';
        gitHubLink.target = '_blank';

        return gitHubLink;
    }

    private createNewsLink(): HTMLDivElement {
        const newsContainer: HTMLDivElement = document.createElement('div');
        newsContainer.className = 'footer__news-link';
        newsContainer.innerText = 'Copyright 2024 ';

        const newsLink: HTMLAnchorElement = document.createElement('a');
        newsLink.innerText = 'NewsAPI';
        newsLink.href = 'https://newsapi.org';
        newsLink.target = '_blank';

        newsContainer.appendChild(newsLink);

        return newsContainer;
    }

    public createLogo(): void {
        if (!this._footer) {
            console.error(`ERROR: Tag footer was not found`);
            return;
        }

        const rssLink: HTMLAnchorElement = this.createRssLink();
        this._footer.appendChild(rssLink);

        const otherLinks: HTMLDivElement = this.createOtherLinksContainer();
        const newsLink: HTMLDivElement = this.createNewsLink();
        const gitHubLink: HTMLAnchorElement = this.createGitHubLink();
        otherLinks.appendChild(gitHubLink);
        otherLinks.appendChild(newsLink);
        this._footer.appendChild(otherLinks);
    }
}

export default Footer;
