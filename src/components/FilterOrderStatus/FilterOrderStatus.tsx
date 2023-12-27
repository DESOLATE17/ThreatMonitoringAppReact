import { FC, useEffect, useState, ChangeEvent } from "react";
import { Container, Row } from "react-bootstrap";
import { Filter } from "../../pages/myRequests/MyRequestsPage";

type FilterByStatusProps = {
  state: Filter;
  handleFilterChange: (filter: Filter) => void;
};

const FilterOrderStatus: FC<FilterByStatusProps> = ({
  state,
  handleFilterChange,
}) => {
  const [filter, setFilter] = useState<Filter>(state);

  const handleChange = (event: any) => {
    const { name, checked } = event.target;
    var f : Filter = {Accepted: false, Canceled: false, Closed: false, Formated : false}
    // @ts-ignore
    f[name as keyof Filter] = checked
    console.log(f)
    setFilter(f);
  };

  useEffect(() => {
    handleFilterChange(filter);
  }, [filter, handleFilterChange]);

  return (
    <Container>
      <Row>
        <div
          style={{
            color: "white",
            fontSize: "24px",
            fontWeight: "500",
            marginLeft: "260px",
          }}
        >
          Фильтр по статусу заявки
        </div>
        <form style={{display: "flex", flexDirection: "row", marginLeft: "200px",}}>
          <div className="radio">
            <label>
              <input
                type="radio"
                value="accepted"
                name="Accepted"
            
                onChange={handleChange}
              />
              принята
            </label>
          </div>
          <div className="radio">
            <label>
              <input
                type="radio"
                value="canceled"
                name="Canceled"

                onChange={handleChange}
              />
              отклонена
            </label>
          </div>
          <div className="radio">
            <label>
              <input
                type="radio"
                value="closed"
                name="Closed"

                onChange={handleChange}
              />
              завершена
            </label>
          </div>
          <div className="radio">
            <label>
              <input
                type="radio"
                value="formated"
                name="Formated"

                onChange={handleChange}
              />
              сформирована
            </label>
          </div>
        </form>
      </Row>
    </Container>
  );
};

export default FilterOrderStatus;
