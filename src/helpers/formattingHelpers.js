import { InlineMath, BlockMath } from 'react-katex';

export function ital(str) {
    return <span className="italic">{str}</span>;
}

export function bold(str) {
    return <span className="bold">{str}</span>;
}

export function boldital(str) {
    return <span className="bold italic">{str}</span>;
}

export function mathy(str) {
    return <span className="mathy"><InlineMath math={str}/></span>;
}

export function latexblock(str) {
    return <span className="latexblock"><BlockMath math={str}/></span>
}