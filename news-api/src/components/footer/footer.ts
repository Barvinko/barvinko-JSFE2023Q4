import './footer.css';
import { TryNull } from '../types/types';
import rssImage from '../../assets/img/rss.svg';

class Footer {
    private readonly _footer: TryNull<HTMLElement>;
    constructor() {
        this._footer = document.querySelector('footer') ? document.querySelector('footer') : null;
    }

    public createLogo() {
        const rssLink: HTMLAnchorElement = document.createElement('a');
        rssLink.href = 'https://rs.school/js/';
        rssLink.target = '_blank';

        const logo: HTMLImageElement = document.createElement('img');
        logo.className = 'footer__logo';
        logo.src = rssImage;
        logo.alt = 'RSS';

        rssLink.appendChild(logo);

        this._footer?.insertBefore(rssLink, this._footer.firstChild);

        const newsLinks: HTMLElement | null = this._footer?.querySelector('.copyright')
            ? this._footer?.querySelector('.copyright')
            : null;

        const otherLinks: HTMLElement = document.createElement('div');
        otherLinks.className = 'footer__comtainer-link';

        this._footer?.appendChild(otherLinks);

        const gitHubLink: HTMLAnchorElement = document.createElement('a');
        gitHubLink.innerText = 'GitHub - Barvinko';
        gitHubLink.className = 'footer__git-hub';
        gitHubLink.href = 'https://github.com/Barvinko';
        gitHubLink.target = '_blank';

        otherLinks.appendChild(gitHubLink);
        if (newsLinks !== null) otherLinks.appendChild(newsLinks);
    }
}

export default Footer;
