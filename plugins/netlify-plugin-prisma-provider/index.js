const fs = require('fs')
const path = require('path')
const PRISMA_SCHEMA_PATH = path.join('api', 'prisma', 'schema.prisma')
const PROVIDER_REGEX = /^\s+provider\s+=\s+["']sqlite["']/m

module.exports = {
  onPreBuild: () => {
    const schema = fs.readFileSync(PRISMA_SCHEMA_PATH).toString()

    if (schema.match(PROVIDER_REGEX)) {
      const newSchemaString = `provider = "${process.env.DATABASE_PROVIDER ||
        'postgresql'}"`
      const newSchema = schema.replace(PROVIDER_REGEX, newSchemaString)
      fs.writeFileSync(PRISMA_SCHEMA_PATH, newSchema)
      console.log(`Replaced provider with \`${newSchemaString}\``)
    }
  },
}
