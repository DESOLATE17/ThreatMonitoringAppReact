import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Navbar from "./components/Navbar/Navbar.tsx";
import { QueryClient, QueryClientProvider } from "react-query";
import { store, persistor } from "./store/store.ts";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { Container, Row } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Threats from "./pages/home/ThreatsPage.tsx";
import LoginPage from "./pages/login/LoginPage.tsx";
import MyRequestsPage from "./pages/myRequests/MyRequestsPage.tsx";
import RegisterPage from "./pages/register/RegisterPage.tsx";
import RequestPage from "./pages/request/RequestPage.tsx";
import ThreatPage from "./pages/threat/ThreatPage.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Container>
            <Navbar />
            <Row>
              <Routes>
                <Route path="/" element={<Navigate to="/threats" replace />} />
                <Route path="threats/" element={<Threats />} />
                <Route path="threats/:threatId" element={<ThreatPage />} />
                <Route path="login/" element={<LoginPage />} />
                <Route path="register/" element={<RegisterPage />} />
                <Route path="requests/" element={<MyRequestsPage />} />
                <Route path="requests/:requestId" element={<RequestPage />} />
              </Routes>
            </Row>
          </Container>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </QueryClientProvider>
);
