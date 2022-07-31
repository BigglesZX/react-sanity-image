# react-sanity-image

Simple React components for making use of images hosted on the [Sanity.io](https://sanity.io/) CDN. I'm using Next.js and didn't really like the extra markup and apparent complexity of [next/image](https://nextjs.org/docs/api-reference/next/image) so decided to try to create some simple components to provide some of that functionality at lower cognitive cost, and without being Next-specific. I'm not sure if this was a good decision. This package provides:

* An `Img` component that generates `srcset` values for a range of image widths specified in `IMAGE_WIDTHS`.
* Also accepts an optional `aspectRatio` prop to ensure generated images are cropped to a specific ratio.
* A `Picture` component that wraps the above, providing a `media` prop allowing different aspect ratios to be specified for different media conditions, to satisfy the art-direction use-case.
* Images support optional `lqip` prop which displays the image's [Low Quality Image Placeholder](https://www.sanity.io/docs/image-metadata#74bfd1db9b97) as a `background-image`.
* Images support WebP format using Sanity's automatic content negotiation.
* Images have `width` and `height` attributes set automatically based on the supplied `aspectRatio` or intrinsic size of the image, to prevent layout shifts.

This package is currently distributed in ES Module and CommonJS formats. This is my first npm package and I don't really know what I'm doing but those two options seemed popular. Structure of this package and README is inspired by [`next-sanity-image`](https://github.com/bundlesandbatches/next-sanity-image/), with thanks.

## Installation

```
npm install --save @biggleszx/react-sanity-image
```

The components require you to pass in a [SanityClient](https://www.npmjs.com/package/@sanity/client) instance, so you'll also need to install that if you haven't already:

```
npm install --save @sanity/client
```

## Usage

Import the component(s) you want to use:

```js
const { Img, Picture } = require('@biggleszx/react-sanity-image');
// or
import { Img, Picture } from '@biggleszx/react-sanity-image';
```

Instantiate the Sanity client (see the SanityClient [docs](https://www.npmjs.com/package/@sanity/client) for more information about the properties used):

```js
const client = sanityClient({
    projectId: 'xxxxxxxx',
    dataset: 'production',
    apiVersion: '2022-03-14',
    useCdn: true,
});
```

Assuming you've already queried a document from Sanity that includes an image field (there's an example [here](https://www.sanity.io/docs/presenting-images#BnS1mFRw); let's say it's `person` and the field is `person.image`), render the `Img` component like this:

```js
// Basic usage at intrinsic aspect ratio
<Img
    client={client}
    image={person.image}
/>

// Specifying aspect ratio and `sizes` attribute, and enabling `lqip`
<Img
    client={client}
    image={person.image}
    aspectRatio={9/16}
    sizes="50vw"
    lqip
/>

// Any other props will be passed to the rendered `<img>` element
<Img
    client={client}
    image={person.image}
    alt={person.name}
    loading="lazy"
/>
```

The `Picture` component is similar but supports an additional `media` prop for adding extra sources:

```js
<Picture
    client={client}
    image={person.image}
    aspectRatio={1/1}
    media={[{
        media: '(min-width: 1024px)',
        aspectRatio: 9/16,
    }]}
    sizes="(min-width: 1024px) 50vw, 100vw"
/>
```

Order of `media` items matters the same way ordering `source` elements inside `<picture>` matters (i.e. the browser will use the first match that it encounters).

Sanity's CDN will automatically serve WebP format images to browsers that support them, so there's no need to include any extra sources for these (you can't specify the `type` attribute at the moment anyway).

Finally, any extra props passed to `Picture` **will be set on the rendered `<picture>` element**. If you want to specify extra props for the `<img>` element inside it, use `imgProps`:

```js
<Picture
    client={client}
    image={person.image}
    className="my-picture-class"
    imgProps={{
        alt: person.name,
        loading: 'lazy',
    }}
/>
```

## Development

Clone the project, activate [`nvm`](https://github.com/nvm-sh/nvm#install--update-script), if that's your thing, and install:

```shell
$ git clone git@github.com:BigglesZX/react-sanity-image.git
$ cd react-sanity-image
$ nvm use  # `nvm install` if necessary
$ npm install
```

Storybook is included to facilitate local development and testing. You'll need to configure a connection to a Sanity project from which an image asset can be retreived for use in stories.

Copy the included `.env.example` file to `.env` and edit it to add your project details and the ID of an asset to fetch. You can find one by querying `imageAsset` documents within your project (`*[_type == "sanity.imageAsset"]`).

```
SANITY_PROJECT_ID="xxxxxxxx"
SANITY_DATASET="production"
SANITY_ASSET_ID="image-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx-1024x1024-jpg"
```

Add the contents of the `.env` file to your environment using whatever means you like ([dotenv](https://github.com/motdotla/dotenv), etc) – the simplest way is to `source` the file in Bash-like shells:

```shell
$ source .env
```

Lastly you'll need to allow CORS access to Sanity from the Storybook instance. Head to the Sanity [management dashboard](https://www.sanity.io/manage/), click on your project, then choose the **API** tab and click **CORS origins**. Click **Add CORS origin** and enter `http://localhost:6006` (or other Storybook origin). You don't need to allow credentials.

Start Storybook:

```
npm run storybook
```

## API

### `Img`

| property      | type | description |
| ------------- | ---- | ----------- |
| `client`      | [`SanityClient`](https://www.npmjs.com/package/@sanity/client) | Client instance to use when building image URLs |
| `image`       | [`SanityImageSource`](https://www.npmjs.com/package/@sanity/image-url#imagesource) | A reference to a Sanity image asset. You can pass in any asset that is also supported by the [image() method of @sanity/image-url](https://www.npmjs.com/package/@sanity/image-url#imagesource). |
| `aspectRatio` | <code>number &#124; null<code> | Aspect ratio (`height ÷ width`) to which the source image should be cropped, e.g. `9/16` or `0.5625` for a 16:9 image. If omitted or set to `null`, the intrinsic aspect ratio of the source will be used. |
| `lqip`        | `boolean`| Set to `true` to use the image's [Low Quality Image Placeholder](https://www.sanity.io/docs/image-metadata#74bfd1db9b97) as a placeholder (via CSS `background-image`). Requires that `lqip` be enabled in the image field's `metadata` setting – I think this needs to be present at time of of upload, but maybe not in recent versions. |
| `sizes`       | `string` | String to use for the rendered `<img>` element's [`sizes`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-sizes) attribute. See example in **Usage** above. |

### `Picture`

| property      | type | description |
| ------------- | ---- | ----------- |
| `client`      | [`SanityClient`](https://www.npmjs.com/package/@sanity/client) | Client instance to use when building image URLs |
| `image`       | [`SanityImageSource`](https://www.npmjs.com/package/@sanity/image-url#imagesource) | A reference to a Sanity image asset. You can pass in any asset that is also supported by the [image() method of @sanity/image-url](https://www.npmjs.com/package/@sanity/image-url#imagesource). |
| `aspectRatio` | <code>number &#124; null<code> | Aspect ratio (`height ÷ width`) to which the source image should be cropped **for the default source**, i.e. if no media conditions match. If omitted or set to `null`, the intrinsic aspect ratio of the source will be used. |
| `lqip`        | `boolean`| Set to `true` to use the image's [Low Quality Image Placeholder](https://www.sanity.io/docs/image-metadata#74bfd1db9b97) as a placeholder |
| `media`       | `[{ media: string, aspectRatio: number }]` | Specify an array of media conditions and aspect ratios which will be used to render `<source>` elements in the resulting `<picture>`. Order of items matters (the browser will use the first match it encounters). See example in **Usage** above. |
| `sizes`       | `string` | String to use for the rendered `<img>` element's [`sizes`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-sizes) attribute. See example in **Usage** above. |
| `imgProps`    | `object` | Any extra props to pass through to the rendered `<img>` element |

## Creating a new version for npm

This is mostly for my benefit.

1. Bump version number in `package.json`
1. Update `CHANGELOG`
1. `$ git commit ...`
1. `$ git tag -a x.x.x` (check `git tags` for current)
1. `$ git push origin main`
1. `$ git push --tags`
1. `$ npm publish --access public`

## TODO

* Add support for [`quality`](https://www.sanity.io/docs/image-urls#q-83311ae15535) prop.
* Correct various other as-yet unrealised bad decisions.
