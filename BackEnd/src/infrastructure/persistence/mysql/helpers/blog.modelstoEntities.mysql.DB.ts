import { BlogEntity } from "../../../../domain/entities/blog/type.blog.entity"

export default function (blog:any): BlogEntity | undefined {
    if(!blog)
    return
    let blogGeneral: BlogEntity = {
        idBlog: blog.idblog,
        title: blog.idUser,
        text: blog.exam,
        pictureMain: blog.date,
    }

    return (blogGeneral as BlogEntity);
}