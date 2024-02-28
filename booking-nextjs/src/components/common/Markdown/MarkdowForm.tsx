import React, { useEffect, useState } from 'react';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { UseFormGetValues } from 'react-hook-form';

type Props = {
    getValues: any;
    setValue: any;
};

export default function MarkdownForm({ getValues, setValue }: Props) {
    const [data, setData] = useState('');
    const mdParser = new MarkdownIt();
    function handleEditorChange({ html, text }: any) {
        setValue('descriptionHTML', text);
        setValue('descriptionMarkdown', html);
        setData(text);
    }
    useEffect(() => {
        setData(getValues('descriptionHTML'));
    }, [getValues('descriptionHTML')]);
    return (
        <MdEditor
            style={{ height: '500px' }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={handleEditorChange}
            value={data}
        />
    );
}
