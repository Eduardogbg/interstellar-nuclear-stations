import type { AsyncPaginatedGetter, paginatorParams } from '../types/API';


async function* paginationFlatGenerator<T>(getter: AsyncPaginatedGetter<T>, params: paginatorParams) {
  const { batch, cursor, pageSize } = params;
  let page = cursor ? Math.ceil(cursor / pageSize) : 1;
  let leftover = cursor ? (cursor - 1) % pageSize : 0;
  let hasNext = true;

  const getPage = async (page: number) => {
    const { next, results } = await getter({ page, page_size: pageSize });
    if (!next) hasNext = false;
    return results;
  }

  const iteratePages = () => (
    hasNext
      ? getPage(page++).catch(err => {
        if (err?.extensions?.response?.status == 404) {
          hasNext = false;
          return [];
        }
        throw err;
      })
      : Promise.resolve([])
  );

  // Requests batches of pages until they run out
  while (hasNext) {
    const requests: Promise<T[]>[] = (
      Array.from({ length: batch }, iteratePages)
    );

    // Yields pages of the batch by resolve order
    for (const results of await Promise.all(requests)) {
      if (leftover) {
        yield* results.slice(leftover);
        leftover = 0;
      } else {
        yield* results;
      }
    }
  }
}


export default paginationFlatGenerator;
