import { Editor } from "@tinymce/tinymce-react"
import { Controller } from "react-hook-form"

export default function RTE({
    name,
    control,
    label,
    defaultValue = "<p>This is Default text</p>"

})
{
    return (
        <div className="w-full">
            {label && <label className='inline-block mb-1 pl-1'>
            {label}</label>}
          <Controller 
            name={name || "content"}
            control={control}
            render={({field: {onChange}}) => (
                <Editor 
                    apiKey='hss8862cnrko4kdvapgkut9pudre9j57ygyiyozwzze0imkm'
                    initialValue={defaultValue}
                    init={
                        {
                            height: 500,
                            menubar: true,
                            mobile: {
                                menubar: true,
                                plugins: 'autosave lists autolink',
                                toolbar: 'undo bold italic styles'
                              },
                            plugins: [
                                'advlist autolink lists link image charmap print preview anchor',
                                'searchreplace visualblocks code fullscreen',
                                'insertdatetime media table paste code help wordcount'                        
                            ],
                            toolbar:    "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent removeformat | help",
                            content_style: "body { font-family:Helvetica, Arial, sans-serif; font-size:14px }",
                        }
                    }
                    onEditorChange={onChange}
                />
            )}
          />
    
          
        </div>
    )
}

