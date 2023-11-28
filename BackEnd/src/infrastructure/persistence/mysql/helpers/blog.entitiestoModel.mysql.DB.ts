import { BlogEntity } from "../../../../domain/entities/blog/type.blog.entity"

export default function (blog: BlogEntity ){
  const blogGeneral = {
    idBlog: blog.idBlog,
    title: blog.title,
    text: blog.text,
    pictureMain: blog.pictureMain,
  }

    return {
        blogGeneral: blogGeneral
    };
}