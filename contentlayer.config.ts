import { defineDocumentType } from 'contentlayer/source-files'

export const Gaknime = defineDocumentType(() => ({
    name: 'Gaknime',
    filePathPattern: 'gaknimes/**/*.yml',
    fields:{
    }
}))