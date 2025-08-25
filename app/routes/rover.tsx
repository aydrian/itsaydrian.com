import { Link } from "react-router";

import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "~/components/ui/card";

export default function Rover() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      {/* Header */}
      <header className="bg-gradient-to-r from-cyan-700 to-emerald-700 py-4 shadow-sm">
        <nav className="container mx-auto flex items-center justify-between">
          <h1 className="bg-gradient-to-r from-cyan-300 to-emerald-300 bg-clip-text text-2xl font-bold text-transparent">
            ItsAydrian Dog Care
          </h1>
          <Link
            className="text-gray-100 transition duration-300 hover:text-emerald-300"
            to="/"
          >
            Back to Home
          </Link>
        </nav>
      </header>

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-cyan-50 to-emerald-50 py-20 text-center">
          <div className="container mx-auto">
            <h2 className="mb-6 text-4xl font-bold text-gray-800 md:text-6xl">
              🐕 Professional Dog Care with a Personal Touch
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-600">
              Experienced, loving care for your furry family members. Local
              Pembroke Welsh Corgi parent who treats every dog like my own.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button
                asChild
                className="bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600"
                size="lg"
              >
                <a
                  href="https://www.rover.com/sit/aydrih08941"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Book on Rover
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="#services">Learn More</a>
              </Button>
            </div>
          </div>
        </section>

        {/* About Me Section */}
        <section className="bg-white py-20" id="about">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
              <div>
                <h2 className="mb-6 text-3xl font-bold text-gray-800">
                  Hi, I&apos;m Aydrian! 👋
                </h2>
                <p className="mb-6 leading-relaxed text-gray-600">
                  I&apos;m a passionate dog lover and proud parent to Atticus,
                  my adorable Pembroke Welsh Corgi. With years of experience
                  caring for dogs of all sizes and temperaments, I understand
                  that every pup is unique and deserves personalized attention.
                </p>
                <p className="mb-6 leading-relaxed text-gray-600">
                  Whether your dog needs daily walks, overnight sitting, or just
                  some companionship during the day, I provide reliable, loving
                  care that gives you peace of mind while you&apos;re away.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge>Corgi Parent</Badge>
                  <Badge variant="secondary">5+ Years Experience</Badge>
                  <Badge variant="outline">Pet First Aid Certified</Badge>
                  <Badge variant="secondary">Flexible Schedule</Badge>
                </div>
              </div>
              <div className="rounded-lg bg-gradient-to-br from-cyan-100 to-emerald-100 p-8 text-center">
                <div className="mb-4 text-6xl">🐾</div>
                <h3 className="mb-2 text-xl font-semibold text-gray-800">
                  Meet Atticus
                </h3>
                <p className="text-gray-600">
                  My Pembroke Welsh Corgi who&apos;s taught me everything about
                  dog care, from puppy energy to senior comfort needs.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section
          className="bg-gradient-to-br from-cyan-50 to-emerald-50 py-20"
          id="services"
        >
          <div className="container mx-auto">
            <h2 className="mb-12 text-center text-3xl font-bold text-gray-800">
              Services I Offer
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card className="transition-shadow hover:shadow-lg">
                <CardHeader>
                  <div className="mb-2 text-3xl">🚶‍♂️</div>
                  <CardTitle className="text-cyan-600">Dog Walking</CardTitle>
                  <CardDescription>
                    Daily walks tailored to your dog&apos;s energy level and
                    needs
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• 30-60 minute walks</li>
                    <li>• Neighborhood or park routes</li>
                    <li>• Photo updates during walks</li>
                    <li>• Flexible scheduling</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="transition-shadow hover:shadow-lg">
                <CardHeader>
                  <div className="mb-2 text-3xl">🏠</div>
                  <CardTitle className="text-emerald-600">
                    Pet Sitting
                  </CardTitle>
                  <CardDescription>
                    In-home care while you&apos;re away for the day
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• Feeding and fresh water</li>
                    <li>• Playtime and companionship</li>
                    <li>• Basic grooming if needed</li>
                    <li>• Regular photo updates</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="transition-shadow hover:shadow-lg">
                <CardHeader>
                  <div className="mb-2 text-3xl">🌙</div>
                  <CardTitle className="text-cyan-600">
                    Overnight Care
                  </CardTitle>
                  <CardDescription>
                    Your dog stays comfortable in their own home
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• Overnight supervision</li>
                    <li>• Normal routine maintenance</li>
                    <li>• Morning and evening walks</li>
                    <li>• Home security presence</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="transition-shadow hover:shadow-lg">
                <CardHeader>
                  <div className="mb-2 text-3xl">🎾</div>
                  <CardTitle className="text-emerald-600">
                    Doggy Daycare
                  </CardTitle>
                  <CardDescription>
                    Supervised play and socialization at my home
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• Socialization with Atticus</li>
                    <li>• Safe, fenced yard</li>
                    <li>• Indoor/outdoor play options</li>
                    <li>• Structured play sessions</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="transition-shadow hover:shadow-lg">
                <CardHeader>
                  <div className="mb-2 text-3xl">🚗</div>
                  <CardTitle className="text-cyan-600">Pet Taxi</CardTitle>
                  <CardDescription>
                    Transportation to vet appointments or grooming
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• Vet appointment transport</li>
                    <li>• Grooming drop-off/pickup</li>
                    <li>• Safe, secure travel</li>
                    <li>• Calm, patient handling</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="transition-shadow hover:shadow-lg">
                <CardHeader>
                  <div className="mb-2 text-3xl">💊</div>
                  <CardTitle className="text-emerald-600">
                    Special Needs Care
                  </CardTitle>
                  <CardDescription>
                    Medication administration and senior dog care
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• Medication scheduling</li>
                    <li>• Senior dog comfort care</li>
                    <li>• Special dietary needs</li>
                    <li>• Gentle, patient approach</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Atticus&apos;s Favorites Section */}
        <section className="bg-white py-20" id="favorites">
          <div className="container mx-auto">
            <h2 className="mb-6 text-center text-3xl font-bold text-gray-800">
              🐕 Atticus&apos;s Favorites
            </h2>
            <p className="mx-auto mb-12 max-w-2xl text-center text-gray-600">
              These are the products Atticus and I swear by! As an Amazon
              affiliate, I earn from qualifying purchases, but I only recommend
              what we actually use and love.
            </p>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card className="transition-shadow hover:shadow-lg">
                <CardHeader>
                  <CardTitle className="text-cyan-600">
                    KONG Classic Dog Toy
                  </CardTitle>
                  <CardDescription>
                    Perfect for treat stuffing and solo play
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-sm text-gray-600">
                    Atticus&apos;s absolute favorite! We stuff it with peanut
                    butter or treats for mental stimulation. Nearly
                    indestructible and keeps him busy for hours.
                  </p>
                  <Button
                    asChild
                    className="w-full bg-amber-500 hover:bg-amber-600"
                  >
                    <a
                      href="https://amazon.com/dp/B0002AR0II?tag=youraffiliateID"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      Shop on Amazon
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card className="transition-shadow hover:shadow-lg">
                <CardHeader>
                  <CardTitle className="text-emerald-600">
                    Blue Buffalo Life Protection
                  </CardTitle>
                  <CardDescription>High-quality dry dog food</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-sm text-gray-600">
                    Atticus has been thriving on this food for years. Great
                    ingredients, no by-products, and it keeps his coat shiny and
                    energy levels perfect.
                  </p>
                  <Button
                    asChild
                    className="w-full bg-amber-500 hover:bg-amber-600"
                  >
                    <a
                      href="https://amazon.com/dp/B004Y4YTKI?tag=youraffiliateID"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      Shop on Amazon
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card className="transition-shadow hover:shadow-lg">
                <CardHeader>
                  <CardTitle className="text-cyan-600">
                    FURminator Deshedding Tool
                  </CardTitle>
                  <CardDescription>
                    Essential for double-coated breeds
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-sm text-gray-600">
                    A game-changer for Atticus&apos;s corgi coat! Reduces
                    shedding by up to 90% and he actually enjoys the grooming
                    sessions.
                  </p>
                  <Button
                    asChild
                    className="w-full bg-amber-500 hover:bg-amber-600"
                  >
                    <a
                      href="https://amazon.com/dp/B0040QQ07C?tag=youraffiliateID"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      Shop on Amazon
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card className="transition-shadow hover:shadow-lg">
                <CardHeader>
                  <CardTitle className="text-emerald-600">
                    Benebone Wishbone
                  </CardTitle>
                  <CardDescription>
                    Durable chew toy for aggressive chewers
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-sm text-gray-600">
                    Perfect for corgis who love to chew! Flavored nylon keeps
                    Atticus entertained and helps maintain dental health.
                  </p>
                  <Button
                    asChild
                    className="w-full bg-amber-500 hover:bg-amber-600"
                  >
                    <a
                      href="https://amazon.com/dp/B00D3NI2PG?tag=youraffiliateID"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      Shop on Amazon
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card className="transition-shadow hover:shadow-lg">
                <CardHeader>
                  <CardTitle className="text-cyan-600">
                    Ruffwear Front Range Harness
                  </CardTitle>
                  <CardDescription>
                    Comfortable, no-pull walking harness
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-sm text-gray-600">
                    The best harness we&apos;ve ever used! Distributes pressure
                    evenly and has completely stopped Atticus&apos;s pulling on
                    walks.
                  </p>
                  <Button
                    asChild
                    className="w-full bg-amber-500 hover:bg-amber-600"
                  >
                    <a
                      href="https://amazon.com/dp/B01N5J6ZSX?tag=youraffiliateID"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      Shop on Amazon
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card className="transition-shadow hover:shadow-lg">
                <CardHeader>
                  <CardTitle className="text-emerald-600">
                    Nina Ottosson Puzzle Toy
                  </CardTitle>
                  <CardDescription>
                    Mental stimulation and treat dispenser
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-sm text-gray-600">
                    Perfect for smart breeds like corgis! Keeps Atticus mentally
                    engaged and slows down his eating when we use it for meals.
                  </p>
                  <Button
                    asChild
                    className="w-full bg-amber-500 hover:bg-amber-600"
                  >
                    <a
                      href="https://amazon.com/dp/B003ARUKTG?tag=youraffiliateID"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      Shop on Amazon
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Why Choose Me Section */}
        <section className="bg-gradient-to-br from-cyan-50 to-emerald-50 py-20">
          <div className="container mx-auto text-center">
            <h2 className="mb-12 text-3xl font-bold text-gray-800">
              Why Choose Aydrian&apos;s Dog Care?
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="p-6">
                <div className="mb-4 text-4xl">❤️</div>
                <h3 className="mb-2 text-xl font-semibold text-gray-800">
                  Genuine Love for Dogs
                </h3>
                <p className="text-gray-600">
                  I don&apos;t just care for dogs - I genuinely love them. Every
                  dog gets the same attention and affection I give Atticus.
                </p>
              </div>
              <div className="p-6">
                <div className="mb-4 text-4xl">📱</div>
                <h3 className="mb-2 text-xl font-semibold text-gray-800">
                  Regular Updates
                </h3>
                <p className="text-gray-600">
                  You&apos;ll receive photos and updates throughout the day so
                  you always know your pup is happy and safe.
                </p>
              </div>
              <div className="p-6">
                <div className="mb-4 text-4xl">🏆</div>
                <h3 className="mb-2 text-xl font-semibold text-gray-800">
                  Experienced & Reliable
                </h3>
                <p className="text-gray-600">
                  5+ years of dog care experience with excellent reviews. I
                  treat your home and pet with the utmost respect.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact/Book Section */}
        <section className="bg-white py-20" id="contact">
          <div className="container mx-auto text-center">
            <h2 className="mb-8 text-3xl font-bold text-gray-800">
              Ready to Book? 🐕
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-gray-600">
              I&apos;d love to meet you and your furry friend! Book through
              Rover to get started, or reach out with any questions about my
              services.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button
                asChild
                className="bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600"
                size="lg"
              >
                <a
                  href="https://www.rover.com/sit/aydrih08941"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Book on Rover
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="mailto:howdy@itsaydrian.com">Email Me</a>
              </Button>
            </div>
            <p className="mt-6 text-sm text-gray-500">
              New clients get 10% off their first booking when you mention this
              website!
            </p>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 py-6 text-center text-white">
        <p>&copy; 2025 Aydrian&apos;s Dog Care. All rights reserved.</p>
        <p className="mt-2 text-sm text-gray-400">
          As an Amazon Associate, I earn from qualifying purchases.
        </p>
      </footer>
    </div>
  );
}
