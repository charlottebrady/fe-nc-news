import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://charlottes-nc-news.herokuapp.com/api",
  timeout: 10000,
});

export const getAllTopics = () => {
  return axiosInstance.get("/topics").then((res) => {
    return res.data.topics;
  });
};

export const getArticles = (sort_by, topic) => {
  return axiosInstance
    .get("/articles", { params: { sort_by, topic } })
    .then((res) => {
      return res.data.articles;
    });
};

export const getSingleArticle = (article_id) => {
  return axiosInstance.get(`/articles/${article_id}`).then((res) => {
    return res.data.article;
  });
};

export const getArticleComments = (article_id) => {
  return axiosInstance.get(`/articles/${article_id}/comments`).then((res) => {
    return res.data.comments;
  });
};

export const postNewComment = (article_id, username, body) => {
  return axiosInstance
    .post(`/articles/${article_id}/comments`, {
      username,
      body,
    })
    .then((res) => {
      return res.data.comment;
    });
};

export const deleteComment = (comment_id) => {
  return axiosInstance.delete(`/comments/${comment_id}`);
};

export const voteOnItem = (type, id, vote) => {
  return axiosInstance
    .patch(`/${type}/${id}`, { inc_votes: vote })
    .then((res) => {
      if (type === "articles") {
        return res.data.article;
      } else {
        return res.data.comment;
      }
    });
};

export const voteOnComment = (comment_id, vote) => {
  return axios;
};
