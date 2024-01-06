import { FC, useState, useEffect } from "react";
import { Card, Container, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../api/index";
import "./RequestPage.css";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import Loader from "../../components/Loader/Loader.tsx";
import { ModelsMonitoringRequest } from "../../api/Api.ts";
import { useAuth } from "../../hooks/useAuth.ts";
import { Threat } from "../../models/Threats.tsx";

const RequestPage: FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [request, setRequest] = useState<ModelsMonitoringRequest>();
  const [threats, setThreats] = useState<Threat[]>([]);
  const navigate = useNavigate();
  const { resetUser } = useAuth();
  const { requestId } = useParams();

  const getData = async () => {
    console.log(requestId);
    const response = await api.api.monitoringRequestsDetail(
      requestId ? +requestId : 1
    );
    if (response.status == 200) {
      console.log(response.data);
      setRequest(response.data.request);
      setThreats(response.data.threats);
    }
    if (response.status == 403) {
      resetUser();
    }
  };

  useEffect(() => {
    getData()
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      {" "}
      {loading ? (
        <Loader />
      ) : (
        <div className="site-body">
          <Container style={{ width: "100%" }}>
            <Row>
              <Breadcrumbs
                pages={[
                  { link: `/requests`, title: `Мои заявки` },
                  {
                    link: `/requests/${requestId}`,
                    title: `Заявка номер ${requestId}`,
                  },
                ]}
              />
            </Row>
            <Row>
              <div style={{ marginTop: "32px",  display: "flex" , flexWrap: "wrap" }}>
                {}
                {threats.map((item) => (
                  <Card
                    className="cart-card"
                    style={{ justifyContent: "start", marginLeft: "15px", height: request?.status == "created" ? "440px" : "360px" }}
                  >
                    <Card.Img
                      className="cart-card__image"
                      src={item.image}
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null; // prevents looping
                        currentTarget.src = "./public/default.jpeg" ;
                      }}
                    ></Card.Img>
                    <Card.Body className="cart-card__content">
                      <h3 className="cart-card__name">{item.name}</h3>
                      <h4 className="cart-card_description">
                        {" "}
                        {item.price} руб
                      </h4>
                    </Card.Body>
                    {request?.status == "created" ? (
                      <div>
                        <button
                          style={{
                            width: "200px",
                            backgroundColor: "rgb(46, 44, 44, 0.6)",
                            fontSize: "1.25em",
                          }}
                          className="search-button cart-button"
                          onClick={async () => {
                            const response =
                              await api.api.monitoringRequestThreatsThreatsDelete(
                                item.threatId
                              );
                            if (response.status == 200) {
                              console.log(response.data);
                              setThreats(response.data.threats);
                            }
                          }}
                        >
                          Удалить
                        </button>
                      </div>
                    ) : (
                      <div></div>
                    )}
                  </Card>
                ))}
              </div>
            </Row>
          </Container>
        </div>
      )}
    </>
  );
};

export default RequestPage;
