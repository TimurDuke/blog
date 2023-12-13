import {format} from "date-fns";

export const formattedDate = date => {
    if (date) {
        return format(new Date(date), 'MMMM d, yyyy');
    }
};

export const createFormattedParagraphs = text => {
    if (text) {
        return text.split('\\n').map((line, index) => (
            <p key={index} style={{margin: '5px 0'}}>{line}</p>
        ));
    }
}