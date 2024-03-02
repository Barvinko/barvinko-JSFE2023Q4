import './sources.css';
import { SourseType, TryNull } from '../../../library/types';

class Sources {
    public draw(data: SourseType[]): void {
        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLTemplateElement;

        if (!sourceItemTemp) {
            console.error('Source item template not found.');
            return;
        }

        data.forEach((item: TryNull<SourseType>) => {
            if (!item) {
                console.warn('Skipping null or undefined source item.');
                return;
            }

            const sourceClone = sourceItemTemp.content.cloneNode(true) as TryNull<HTMLTemplateElement>;

            if (sourceClone === null) {
                console.error('Failed to clone source item template.');
                return;
            }

            const itemNameElement: TryNull<HTMLSpanElement> = sourceClone.querySelector('.source__item-name');
            const itemElement: TryNull<HTMLDivElement> = sourceClone.querySelector('.source__item');

            if (itemNameElement && itemElement) {
                itemNameElement.textContent = item.name || '';
                itemElement.setAttribute('data-source-id', item.id);

                fragment.append(sourceClone);
            } else {
                console.error('Required elements not found in source item template.');
            }
        });

        const sourcesElement: TryNull<HTMLDivElement> = document.querySelector('.sources');
        if (sourcesElement) {
            sourcesElement.innerHTML = '';
            sourcesElement.append(fragment);
        } else {
            console.error('Sources element not found.');
        }
    }
}

export default Sources;
