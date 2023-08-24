import { useRef, useState } from "react"


export default function useImage() {
    const [image, setImage] = useState({ file: null, src: undefined })
    const input = useRef(null)

    const trigger = () => input.current?.click()

    const onChange = (event) => {
        const files = Array.from(event.target.files)
        if(!event.target.files.length) { return }

        const file = files.pop()
        if(!file.type.match('image')) { return }

        const reader = new FileReader()

        reader.onload = (event) => setImage({ src: event.target.result, file })

        reader.readAsDataURL(file)
    } 

    const element = <input 
                        style={{display: 'none'}} 
                        onChange={onChange} 
                        ref={input} 
                        type="file" 
                        accept="image/png, image/jpg, image/jpeg" 
                    /> 

    return {
        element,
        trigger,
        image
    }
}