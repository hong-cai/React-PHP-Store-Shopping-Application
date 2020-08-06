import React from 'react';
import Title from './components/Title';
import Textblock from './components/Textblock';

export default props => {
    return (
        <div>
            <h3><Title name='company' title='Introduction' /></h3>
            <Textblock content="A text block about the history and main business" />
        </div>
    )
}
