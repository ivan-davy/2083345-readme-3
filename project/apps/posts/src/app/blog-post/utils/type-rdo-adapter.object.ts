import {PostTextRdo} from '../rdo/post-text.rdo';
import {PostImageRdo} from '../rdo/post-image.rdo';
import {PostVideoRdo} from '../rdo/post-video.rdo';
import {PostLinkRdo} from '../rdo/post-link.rdo';
import {PostQuoteRdo} from '../rdo/post-quote.rdo';

export const TypeRdoAdapterObject = {
  'text': PostTextRdo,
  'image': PostImageRdo,
  'video': PostVideoRdo,
  'link': PostLinkRdo,
  'quote': PostQuoteRdo,
}
