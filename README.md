# image-loader
[![CircleCI](https://circleci.com/gh/Argeento/image-loader.svg?style=shield)](https://circleci.com/gh/Argeento/image-loader)
[![Coverage Status](https://coveralls.io/repos/github/Argeento/image-loader/badge.svg?branch=master)](https://coveralls.io/github/Argeento/image-loader?branch=master)

Promise based image loader for the browser

## Install

script tag
```html
<script src="image-loader.min.js"></script>
```

npm
```
coming soon...
```
## Description
The `imageLoader` function returns a promise that resolve on images load.

### How to pass URLs

#### String
```javascript
imageLoader('http://placehold.it/400x400').then(info => {
  console.log('Image loaded!', info)
})
```

#### Array of Strings
```javascript
const images = ['http://placehold.it/400x400', 'http://placehold.it/200x200']

imageLoader(images).then(info => {
  console.log('Images loaded!', info)
})
```

#### Array of Objects
NOTE: Object must have `url` property. `ref` property is optional. Any other properties will be ignored
```javascript
const images = [
  {
    url: 'http://placehold.it/400x400',
    ref: { id: 1 }
  },
  {
    url: 'http://placehold.it/300x300',
    ref: { id: 2 }
  }
]

imageLoader(images).then(info => {
  console.log('Images loaded!', info)
})
```

#### Or leave it empty!
URLs will be loaded from DOM (`<img>` tags)
```javascript
imageLoader().then(info => {
  console.log('Images loaded!', info)
})
```

### Image onload callback
You can pass a **callback** function to get information about **loader status** and current **loaded image**.
```javascript
const images = ['http://placehold.it/400x400', 'http://placehold.it/300x300']

imageLoader(images, (status, loadedImage) => {
  console.log('Status: ', status)
  console.log('Loaded image: ', loadedImage)
}).then(info => {
  console.log('Images loaded!', info)
})
```

**status**
- `loaded` Number of loaded images
- `all` Number of all images
- `percent` (`Math.round(100 * loaded / all)`)

**loadedImage**
- `time` Request duration (ms)
- `url` Image URL
- `ref` Reference passed with this image
- `error` Any error occurs?

## Examples

### Create simple loader
```javascript
const loaderEl = document.querySelector('.loader')
const statusEl = document.querySelector('.loader__status')

imageLoader(status => {
  statusEl.textContent = status.percent + '%'
}).then(info => {
  loaderEl.classList.add('loader--hidden')
})
```

### Create loader from incoming URLs
```javascript
fetchUsers().then(users => {
  // ... set avatars img src

  const avatars = users.map(user => {
    return {
      url: user.avatar_URL,
      ref: user.id
    }
  })

  const onAvatarLoaded = (loaderStatus, loadedImage) => {
    // ... hide loader from user avatar
  }

  return imageLoader(avatars, onAvatarLoaded)

}).then(avatarsInfo => {
  // ... all avatars have loaded
})
```