import type { Modifier } from '@dnd-kit/core';
import type { ClientRect } from '@dnd-kit/core';
import type { Transform } from '@dnd-kit/utilities';

export const restrictToElement = (elementRef: React.RefObject<HTMLDivElement>) => {
    const restrictFn: Modifier = ({ draggingNodeRect, transform }) => {
        if (!draggingNodeRect || !elementRef || !elementRef.current) {
            return transform;
        }
        const elementRect = elementRef.current.getBoundingClientRect()
        return restrictToBoundingRect(transform, draggingNodeRect, elementRect);
    };
    return restrictFn
}

export function restrictToBoundingRect(transform: Transform, rect: ClientRect, boundingRect: ClientRect): Transform {
    const value = { ...transform };
    if (rect.top + transform.y <= boundingRect.top) {
        value.y = boundingRect.top - rect.top;
    } else if (rect.bottom + transform.y >= boundingRect.top + boundingRect.height) {
        value.y = boundingRect.top + boundingRect.height - rect.bottom;
    }
    if (rect.left + transform.x <= boundingRect.left) {
        value.x = boundingRect.left - rect.left;
    } else if (rect.right + transform.x >= boundingRect.left + boundingRect.width
    ) {
        value.x = boundingRect.left + boundingRect.width - rect.right;
    }
    return value;
}