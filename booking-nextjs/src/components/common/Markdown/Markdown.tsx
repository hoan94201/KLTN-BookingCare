import React, { useEffect, useState } from 'react';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { UseFormGetValues, UseFormSetValue } from 'react-hook-form';
import { DoctorInforData } from '@/interfaces/common';

type Props = {
    setValue: UseFormSetValue<DoctorInforData>;
    getValues: UseFormGetValues<DoctorInforData>;
};

export default function Markdown({ setValue, getValues }: Props) {
    const [data , setData] = useState('')
    const mdParser = new MarkdownIt();
    function handleEditorChange({ html, text }: any) {
        setValue('contentHTML', text);
        setValue('contentMarkdowmn', html);
        setData(text)
    }
    useEffect(() => {
        setData(getValues('contentHTML'));
    }, [getValues('contentHTML')]);
    return (
        <MdEditor
            style={{ height: '500px' }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={handleEditorChange}
            value={data}
        />
    );
}
