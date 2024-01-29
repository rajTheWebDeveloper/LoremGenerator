import {screen,render, fireEvent} from '@testing-library/react'
import LoremGen from './LoremGen'



test('Test whether when input is filled and clicked on generate button it displays same number of paragraphs in input',async ()=>
{
    let {getAllByRole,getByRole}=render(<LoremGen/>)
    let textBoxValue=getByRole('text-box')
    await fireEvent.change(textBoxValue,{target:{value:4}})
    let updatedTextBoxValue=getByRole('text-box')
    expect(Number(textBoxValue.value)).toEqual(
      Number(updatedTextBoxValue.value)
    );
    let generate=getByRole('generate')
    await fireEvent.click(generate)
    let allSentences=getAllByRole('sentence')
    expect(allSentences.length).toEqual(Number(updatedTextBoxValue.value));
})