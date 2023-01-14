import Component, { PropsType, StateType } from '../../Component'
import { PostRes, Response, AddPostRes, UnsplashRes } from '../../types/Response'
import fetch from '../../utils/fetch'
import handleAPIError from '../../utils/handleAPIError'
import navigateTo from '../../utils/navigateTo'
import blockXss from '../../utils/blockXss'
import styles from './styles.module.css'
import { PostType } from '../../types/Post'

interface WritePropsType extends PropsType {
  postId?: string
}

interface WriteFormElement extends HTMLFormElement {
  titleInput: HTMLInputElement
  contentInput: HTMLTextAreaElement
  imageInput: HTMLInputElement
}

class Write extends Component<StateType, WritePropsType> {
  didMount(): void {
    this.getPost()
  }

  template(): string {
    const postId = this.props.pageParams?.[0]

    return `
      <div class=${styles.container}>
        <form>
          <div class=${styles.section}>
            <button type="button" class=${styles.addImage}>
              <i></i>
              <img src="" class=${styles.thumb}>
              <input name="imageInput" type="hidden">
            </button>
          </div>
          <div class=${styles.section}>
            <label for="titleInput" class=${styles.default}>제목</label>
            <input name="titleInput" class=${styles.title}>
          </div>
          <div class=${styles.section}>
            <label for="contentInput" class=${styles.default}>내용</label>
            <textarea name="contentInput" class=${styles.default}></textarea>
          </div>
          <div class=${styles.buttonWrapper}>
          <button type="submit" class=${styles.submit}>
            ${postId ? '수정하기' : '등록하기'}
          </button>
          </div>
        </form>
      </div>
    `
  }

  setEvent(): void {
    this.addEvent('click', `button.${styles.addImage}`, (e) => {
      const $button = (e.target as Element).closest(
        `button.${styles.addImage}`
      ) as HTMLButtonElement
      this.getImage($button)
    })

    this.addEvent('submit', 'form', (e) => {
      e.preventDefault()

      this.handlePost(e)
    })
  }

  getPost(): void {
    if (this.props.pageParams) {
      const postId = this.props.pageParams[0]
      fetch
        .get<Response<PostRes>>(`/post/${postId}`)
        .then(({ data: res }) => {
          if (!res.success) {
            window.alert(`요청을 실패했습니다.`)
            return
          }
          const { post } = res.data
          this.renderPost(post)
        })
        .catch(handleAPIError)
    }
  }

  renderPost(post: PostType): void {
    const $title = this.target.querySelector(`input.${styles.title}`) as HTMLInputElement
    $title.value = blockXss(post.title)

    const $content = this.target.querySelector(`textarea.${styles.default}`) as HTMLTextAreaElement
    $content.innerHTML = blockXss(post.content)

    const $thumb = this.target.querySelector(`img.${styles.thumb}`) as HTMLImageElement
    const $image = this.target.querySelector('input[name="imageInput"]') as HTMLInputElement
    $image.value = $thumb.src = blockXss(post.image)
  }

  getImage($button: HTMLButtonElement): void {
    const url = `https://api.unsplash.com/photos/random`
    fetch
      .get<UnsplashRes>(url, {
        headers: {
          Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_API_KEY}`,
        },
      })
      .then(({ data }) => {
        const imageUrl = data.urls.regular

        this.setImageData($button, imageUrl)
      })
      .catch(handleAPIError)
  }

  setImageData($button: HTMLButtonElement, imageUrl: string): void {
    const imageInput = $button.querySelector('input[name="imageInput"]') as HTMLInputElement
    const thumb = $button.querySelector(`img.${styles.thumb}`) as HTMLImageElement
    imageInput.value = thumb.src = imageUrl
  }

  isValid(title: string, content: string, image: string): boolean {
    if (!title) {
      window.alert('제목을 입력해주세요.')
      return false
    }
    if (!content) {
      window.alert('내용을 입력해주세요.')
      return false
    }
    if (!image) {
      window.alert('이미지를 가져와주세요.')
      return false
    }

    return true
  }

  handlePost(e: Event): void {
    const { titleInput, contentInput, imageInput } = e.target as WriteFormElement

    const title = titleInput.value
    const content = contentInput.value
    const image = imageInput.value

    if (!this.isValid(title, content, image)) {
      return
    }

    if (this.props.pageParams) {
      const postId = this.props.pageParams[0]
      this.editPost(postId, title, content, image)
      return
    }

    this.addPost(title, content, image)
  }

  editPost(postId: string, title: string, content: string, image: string): void {
    fetch
      .patch<Response<unknown>>(`/post/${postId}`, {
        title: blockXss(title),
        content: blockXss(content),
        image,
      })
      .then(({ data: res }) => {
        if (res.code! >= 400) {
          window.alert('수정을 실패했습니다.')
          return
        }
        navigateTo(`/post/${postId}`)
        window.alert('수정을 성공했습니다.')
      })
      .catch(handleAPIError)
  }

  addPost(title: string, content: string, image: string): void {
    fetch
      .post<Response<AddPostRes>>('/post', {
        title: blockXss(title),
        content: blockXss(content),
        image,
      })
      .then(({ data: res }) => {
        if (res.code! >= 400) {
          window.alert('작성을 실패했습니다.')
          return
        }
        navigateTo(`/post/${res.data.postId}`)
        window.alert('작성을 성공했습니다.')
      })
      .catch(handleAPIError)
  }
}

export default Write
