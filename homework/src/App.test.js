import { render, screen } from "@testing-library/react"
import { setupServer } from "msw/node"
import { rest } from "msw"
import App from "./App"

// Set up the mock server
const server = setupServer(
  rest.get("/api/data", (req, res, ctx) => {
    return res(ctx.json({ data: "mock data" }))
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test("renders app", () => {
  render(<App />)
  const linkElement = screen.getByText(/Beverages/i)
  expect(linkElement).toBeInTheDocument()
})

test("displays data when fetch is successful", async () => {
  render(<App />)

  // Wait for the DataGraphics component to load
  const dataGraphics = await screen.findByTestId("data-graphics", {}, { timeout: 1000 })

  // Check that the data is displayed
  expect(dataGraphics).toBeInTheDocument()
})

test("displays error message", async () => {
  render(<App />)
  
  // Wait for the data to load
  expect(screen.getByText("🌚")).toBeInTheDocument()

  // Display error if no data is loaded
  const errorMessage = await screen.findByText("oh, no! No data", {}, { timeout: 1000 })
  expect(errorMessage).toBeInTheDocument()
})