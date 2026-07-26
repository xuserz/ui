import{n as e}from"./rolldown-runtime-DaJ6WEGw.js";import{D as t,E as n,T as r,c as i,x as a}from"./iframe-BqqRybbG.js";import{n as o,t as s}from"./Input-DtlGI15g.js";var c,l,u,d,f,p,m,h,g;e((()=>{i(),o(),n(),c={title:`Forms/Input`,component:s,render:e=>{let[n,i]=r(``),[o,c]=r(!1),l;return a(s,t(e,{get value(){return n()},get loading(){return e.loading||o()},onInput:e=>{clearTimeout(l),c(!0),i(e.target.value),l=setTimeout(()=>{c(!1)},800)}}))},tags:[`autodocs`],args:{placeholder:`Placeholder`,status:`default`,disabled:!1,type:`text`,readOnly:!1,loading:!1,size:`medium`},argTypes:{size:{control:`select`,options:[`small`,`medium`,`large`]},placeholder:{control:`text`,description:`Текст-подсказка, отображаемый в пустом поле.`},status:{control:`select`,options:[`default`,`auto`,`valid`,`invalid`],table:{defaultValue:{summary:`default`}}},disabled:{control:`boolean`,table:{defaultValue:{summary:`false`}}},type:{control:`select`,options:[`text`,`password`,`email`,`tel`,`url`,`search`,`number`],table:{defaultValue:{summary:`text`}}},readOnly:{control:`boolean`},loading:{control:`boolean`,description:`Загрузка`}}},l={args:{type:`text`}},u={args:{type:`url`}},d={args:{type:`tel`}},f={args:{type:`search`}},p={args:{type:`password`}},m={args:{type:`number`}},h={args:{type:`email`}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{code:`const Text = props => {
    const [value, setValue] = createSignal('')
    const [loading, setLoading] = createSignal(false)
    let timer: NodeJS.Timeout

    return (
        <Input
            {...props}
            value={value()}
            loading={props.loading || loading()}
            onInput={event => {
                clearTimeout(timer)
                setLoading(true)
                setValue(event.target.value)

                timer = setTimeout(() => {
                    setLoading(false)
                }, 800)
            }}
        />
    )
};`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{code:`const Url = props => {
    const [value, setValue] = createSignal('')
    const [loading, setLoading] = createSignal(false)
    let timer: NodeJS.Timeout

    return (
        <Input
            {...props}
            value={value()}
            loading={props.loading || loading()}
            onInput={event => {
                clearTimeout(timer)
                setLoading(true)
                setValue(event.target.value)

                timer = setTimeout(() => {
                    setLoading(false)
                }, 800)
            }}
        />
    )
};`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{code:`const Telephone = props => {
    const [value, setValue] = createSignal('')
    const [loading, setLoading] = createSignal(false)
    let timer: NodeJS.Timeout

    return (
        <Input
            {...props}
            value={value()}
            loading={props.loading || loading()}
            onInput={event => {
                clearTimeout(timer)
                setLoading(true)
                setValue(event.target.value)

                timer = setTimeout(() => {
                    setLoading(false)
                }, 800)
            }}
        />
    )
};`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{code:`const Search = props => {
    const [value, setValue] = createSignal('')
    const [loading, setLoading] = createSignal(false)
    let timer: NodeJS.Timeout

    return (
        <Input
            {...props}
            value={value()}
            loading={props.loading || loading()}
            onInput={event => {
                clearTimeout(timer)
                setLoading(true)
                setValue(event.target.value)

                timer = setTimeout(() => {
                    setLoading(false)
                }, 800)
            }}
        />
    )
};`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{code:`const Password = props => {
    const [value, setValue] = createSignal('')
    const [loading, setLoading] = createSignal(false)
    let timer: NodeJS.Timeout

    return (
        <Input
            {...props}
            value={value()}
            loading={props.loading || loading()}
            onInput={event => {
                clearTimeout(timer)
                setLoading(true)
                setValue(event.target.value)

                timer = setTimeout(() => {
                    setLoading(false)
                }, 800)
            }}
        />
    )
};`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{code:`const Number = props => {
    const [value, setValue] = createSignal('')
    const [loading, setLoading] = createSignal(false)
    let timer: NodeJS.Timeout

    return (
        <Input
            {...props}
            value={value()}
            loading={props.loading || loading()}
            onInput={event => {
                clearTimeout(timer)
                setLoading(true)
                setValue(event.target.value)

                timer = setTimeout(() => {
                    setLoading(false)
                }, 800)
            }}
        />
    )
};`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{code:`const Email = props => {
    const [value, setValue] = createSignal('')
    const [loading, setLoading] = createSignal(false)
    let timer: NodeJS.Timeout

    return (
        <Input
            {...props}
            value={value()}
            loading={props.loading || loading()}
            onInput={event => {
                clearTimeout(timer)
                setLoading(true)
                setValue(event.target.value)

                timer = setTimeout(() => {
                    setLoading(false)
                }, 800)
            }}
        />
    )
};`,...h.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    type: 'text'
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    type: 'url'
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    type: 'tel'
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    type: 'search'
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    type: 'password'
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    type: 'number'
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    type: 'email'
  }
}`,...h.parameters?.docs?.source}}},g=[`Text`,`Url`,`Telephone`,`Search`,`Password`,`Number`,`Email`]}))();export{h as Email,m as Number,p as Password,f as Search,d as Telephone,l as Text,u as Url,g as __namedExportsOrder,c as default};