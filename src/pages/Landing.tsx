export default function Landing() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        {/* Hero Section */}
        <div className="space-y-4">
          <h1 className="text-5xl font-bold tracking-tight">
            Bienvenue sur Readventures 📚
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Gérez votre librairie personnelle et suivez vos lectures en toute simplicité
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="p-6 rounded-lg border space-y-2">
            <div className="text-3xl mb-2">📖</div>
            <h3 className="text-lg font-semibold">Votre bibliothèque</h3>
            <p className="text-sm text-muted-foreground">
              Organisez et suivez tous vos livres en un seul endroit
            </p>
          </div>
          <div className="p-6 rounded-lg border space-y-2">
            <div className="text-3xl mb-2">📊</div>
            <h3 className="text-lg font-semibold">Suivi de lecture</h3>
            <p className="text-sm text-muted-foreground">
              Suivez votre progression et vos objectifs de lecture
            </p>
          </div>
          <div className="p-6 rounded-lg border space-y-2">
            <div className="text-3xl mb-2">⭐</div>
            <h3 className="text-lg font-semibold">Recommandations</h3>
            <p className="text-sm text-muted-foreground">
              Découvrez de nouveaux livres adaptés à vos goûts
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

