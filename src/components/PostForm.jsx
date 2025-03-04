import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form"
import { Button, Input, Select, RTE } from "./index";
import appwriteService from '../appwrite/config';
import { useNavigate } from "react-router-dom";
import {useSelector } from "react-redux";


function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.slug || '',
            content: post?.content || '',
            status: post?.status || 'active',
        }
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData)
    const submit = async (data) => {
        console.log(data);
        if (post) {
            const file = data.image[0] ? appwriteService.uploadFile(data.image[0]) : null;
            if (file) {
                appwriteService.deleteFile(post.featuredImage);
            }
            const dbPost = await appwriteService.updatePost(
                post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined,
            }
            )
            if (dbPost) {
                navigate(`/post/${dbPost.$id}`)
            }
        } else {
            console.log("Post Form Submitted")
            const file = await  appwriteService.uploadFile(data.image[0]);
            console.log(file)
            console.log(userData);
            if (file) {
                const fileId = file.$id;
                data.featuredImage = fileId;
                const dbpPost = await appwriteService.createPost(
                    {
                        ...data,
                        userId: userData.$id,
                    }
                )
                if (dbpPost) {
                    navigate(`/post/${dbpPost.$id}`);
                }
            }
        }
    }

    const slugTransform = useCallback((value) => {
        if (value && typeof value === 'string') {
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, '-')
                .replace(/\s/g, '-') 
        }
        return ''
    }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === 'title') {
                setValue('slug', slugTransform(value.title, { shouldValidate: true }))
            }
        })

        //Used For Optimization 
        return () => {
            subscription.unsubscribe()
        }
    }, [watch, slugTransform, setValue])

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title" className="mb-4"
                    {...register("title", {
                        required: true
                    })
                    }
                />
                <Input
                    label="Slug :"
                    placeholder="Slug" className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(
                            e
                            .currentTarget.value), {
                            shouldValidate: true
                        });
                    }
                    }
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues
("content")} />
            </div>
            <div className="w-1/3 px-2">
                    <Input
                    
                    label="Featured Image :"
                    type="file" className="block w-full text-sm text-slate-500
                    file:mr-4 file:py-1 file:px-1
                    file:rounded-full file:border-0
                    file:text-xs file:font-semibold
                    file:bg-violet-50 file:text-violet-700
                    hover:file:bg-violet-100"
                    accept="image/png, image/jpg, image/ jpeg, image/gif" 
                    {...register("image", { required: !post })}
                    />

                    {
                        post && 
                        (
                            <div w-full mb-4>
                            <img
                             src={appwriteService.getFilePreview(post.featuredImage)}
                                alt={post.title}
                                className=" rounded-1g" />
                            </div>
                        )
                    }
                <Select
                    options={["active", "inactive"]} label="Status" className="mb-4"
                {...register("status", { required:true})}
                    />
                <Button type="submit" bgColor={post ?
                    "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    )
}



export default PostForm;