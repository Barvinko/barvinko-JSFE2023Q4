import './sources.css';
import { SourseType, TryNull } from '../../types/types';

class Sources {
    draw(data: SourseType[]): void {
        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLTemplateElement;

        data.forEach((item: TryNull<SourseType>) => {
            if (!item || item === null) {
                return;
            }
            const sourceClone = sourceItemTemp.content.cloneNode(true) as TryNull<HTMLElement>;
            if (sourceClone === null) {
                return;
            }

            const itemNameElement: TryNull<Element> = sourceClone.querySelector('.source__item-name');
            const itemElement: TryNull<Element> = sourceClone.querySelector('.source__item');

            if (itemNameElement !== null && itemElement !== null) {
                itemNameElement.textContent = item.name;
                itemElement.setAttribute('data-source-id', item.id);

                fragment.append(sourceClone);
            }
        });

        const sourcesElement: TryNull<Element> = document.querySelector('.sources');
        if (sourcesElement !== null) sourcesElement.append(fragment);
    }
}

export default Sources;
