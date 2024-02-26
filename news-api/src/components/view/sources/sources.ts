import './sources.css';
import { SourseType, TryNull } from '../../types/types';

class Sources {
    draw(data: TryNull<SourseType>[]): void {
        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector('#sourceItemTemp') as TryNull<HTMLTemplateElement>;

        data.forEach((item: SourseType) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true) as TryNull<HTMLElement>;

            sourceClone.querySelector('.source__item-name').textContent = item.name;
            sourceClone.querySelector('.source__item').setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        document.querySelector('.sources').append(fragment);
    }
}

export default Sources;
