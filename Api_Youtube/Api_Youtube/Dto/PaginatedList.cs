namespace Api_Youtube.Dto;

public class PaginatedList<T> : List<T>
{
    public int TotalCount { get; set; }
    public int PageNumber { get; set; }
    public int PageSize { get; set; }

    public PaginatedList(List<T> items, int totalCount, int pageNumber, int pageSize)
    {
        AddRange(items);
        TotalCount = totalCount;
        PageNumber = pageNumber;
        PageSize = pageSize;
    }

    public int TotalPages => (int)Math.Ceiling(TotalCount / (double)PageSize);
}
