arg ALPINE_VERSION=3.19

from node:21-alpine${ALPINE_VERSION} as builder

workdir /build-stage/
copy package*.json ./
copy tsconfig.json ./
run npm ci

workdir /build-stage/packages/controller/
copy packages/controller/package.json ./
copy packages/controller/tsconfig.json ./
copy packages/controller/src/ ./
run npm ci
run npm run build

from alpine:${ALPINE_VERSION}

workdir /usr/src/app/
run apk add --no-cache libstdc++ dumb-init \
  && addgroup -g 1000 node && adduser -u 1000 -G node -s /bin/sh -D node \
  && chown node:node ./
copy --from=builder /usr/local/bin/node /usr/local/bin/
copy --from=builder /usr/local/bin/docker-entrypoint.sh /usr/local/bin/

entrypoint ["docker-entrypoint.sh"]
user node

copy --from=builder /build-stage/node_modules/ ./node_modules/
copy --from=builder /build-stage/package*.json ./

workdir /usr/src/app/packages/controller/
copy --from=builder /build-stage/packages/controller/node_modules/ ./node_modules/
copy --from=builder /build-stage/packages/controller/out/ ./out/
copy --from=builder /build-stage/packages/controller/package.json ./

cmd ["dumb-init", "node", "out/index.js"]
