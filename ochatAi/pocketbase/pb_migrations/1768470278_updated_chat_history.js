/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1009580068")

  // add field
  collection.fields.addAt(3, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_3404373676",
    "hidden": false,
    "id": "relation3040763149",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "conv_relation",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1009580068")

  // remove field
  collection.fields.removeById("relation3040763149")

  return app.save(collection)
})
