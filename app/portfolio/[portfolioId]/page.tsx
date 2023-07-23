export default function PortfolioPage({
   params: { portfolioId },
}: {
   params: { portfolioId: string };
}) {
   return <div>Render page with {portfolioId} id</div>;
}
