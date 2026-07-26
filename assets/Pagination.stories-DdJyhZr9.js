import{n as e}from"./rolldown-runtime-DaJ6WEGw.js";import{E as t,S as n,T as r,c as i,x as a}from"./iframe-BqqRybbG.js";import{n as o,t as s}from"./Pagination-NHCi9N45.js";var c,l,u;e((()=>{i(),o(),t(),c={title:`Blocks/Pagination`,component:s,render:e=>{let[t,i]=r(e.page);return n(()=>{i(e.page)}),a(s,{get page(){return t()},onPageChange:i})},args:{page:1},argTypes:{}},l={},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{code:`const Docs = props => {
    const [page, setPage] = createSignal(props.page)

    createEffect(() => {
        setPage(props.page)
    })

    return <Pagination page={page()} onPageChange={setPage} />
};`,...l.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{}`,...l.parameters?.docs?.source},description:{story:`Базовое действие для главной кнопки на экране.`,...l.parameters?.docs?.description}}},u=[`Docs`]}))();export{l as Docs,u as __namedExportsOrder,c as default};