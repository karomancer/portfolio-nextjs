import React from 'react';
import { renderRichText } from "gatsby-source-contentful/rich-text"
import { BLOCKS, MARKS } from '@contentful/rich-text-types';

import './styles.scss';
import Asset from './Asset';

const RichText = props => {
  const getAsset = (data) => {
    const target = data?.target;

    if (target) {
      const {
        title: { 'en-US': title },
      } = target;

      const file = target.file;
      if (file?.contentType) {
        const asset = {
          title: title,
          file: file,
        }
        return <Asset asset={asset} />
      }

      const url = target?.url;
      if (url) {
        if (url.match(/codepen/)) {
          const slug = url.split('/').pop();
          return (
            <>
              <p
                className="codepen"
                data-height="600"
                data-theme-id="light"
                data-default-tab="result"
                data-user="karomancer"
                data-slug-hash={slug}
                data-pen-title={title}
              >
                <span>
                  <span className="reload-pen">
                    Not seeing the pen?
                    <br />
                    <button onClick={() => location.reload()}>Reload codepen</button>
                  </span>
                  <span className="see-pen">
                    See the Pen <a href={url}>{title}</a> by karomancer (
                    <a href="https://codepen.io/karomancer">@karomancer</a>) on{' '}
                    <a href="https://codepen.io">CodePen</a>.
                  </span>
                </span>
              </p>
            </>
          );
        }
        if (url.match(/vimeo/)) {
          return (
            <iframe
              src={url}
              width="100%"
              height="600"
              frameBorder="0"
              allow="autoplay; fullscreen"
              allowFullScreen
            ></iframe>
          );
        }
        if (url.match(/youtube/)) {
          return (
            <iframe
              width="100%"
              height="600"
              src={url}
              frameBorder="0"
              allowFullScreen
            ></iframe>
          );
        }
        if (url.match(/spotify/)) {
          return (
            <iframe
              src={url}
              width="100%"
              height="300"
              frameBorder="0"
              allow="encrypted-media"
            ></iframe>
          );
        }
      }
    };
  }

  let options = {
    renderNode: {
      [BLOCKS.HEADING_2]: (node, children) => (
        <h2 style={{ color: props.color }}>{node.content[0].value}</h2>
      ),
      [BLOCKS.QUOTE]: (node, children) => (
        <blockquote style={{ borderColor: props.color }}>{children}</blockquote>
      ),
      [BLOCKS.EMBEDDED_ASSET]: ({ data }, children) => getAsset(data),//({ data }, children) => getAsset(data),
      'embedded-entry-inline': ({ data }, children) => getAsset(data),
    },
  };

  if (props.plainText) {
    const nullFn = () => null
    const plainFn = node => node.content[0].value
    options = {
      renderNode: {
        [BLOCKS.HEADING_1]: nullFn,
        [BLOCKS.HEADING_2]: nullFn,
        [BLOCKS.HEADING_3]: nullFn,
        [BLOCKS.PARAGRAPH]: plainFn,
        [BLOCKS.QUOTE]: plainFn,
        [BLOCKS.EMBEDDED_ASSET]: () => null,
      }
    }
  }

  return (
    <div className="richtext">
      {renderRichText(props.plainText ? { raw: props.document.raw } : props.document, options)}
    </div>
  );
};

export default RichText;
