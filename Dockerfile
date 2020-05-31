FROM node:12-alpine

ARG REPO_MOUNT_POINT
COPY ./ $REPO_MOUNT_POINT

WORKDIR $REPO_MOUNT_POINT
RUN chown -R node:node ${REPO_MOUNT_POINT}

# Just checks cache and lock file, doesn't hit the network
RUN yarn install --immutable --immutable-cache --inline-builds
