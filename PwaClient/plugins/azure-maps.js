import * as atlas from 'azure-maps-control';

export default function({ app }, inject) {
    inject('atlas', atlas)
}