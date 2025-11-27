import { Link } from "react-router";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "~/components/ui/card";
import foraProfile from "~/images/fora-profile.png";
import roverProfile from "~/images/rover-profile.jpg";

export default function IndexPage() {
  return (
    <>
      <title>ItsAydrian LLC</title>
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Travel Advising Card */}
          <a
            className="group"
            href="https://www.foratravel.com/advisor/aydrian-howard"
            rel="noopener noreferrer"
            target="_blank"
          >
            <Card className="h-full cursor-pointer transition-all hover:scale-[1.02] hover:shadow-lg">
              <CardHeader className="text-center">
                <img
                  alt="Aydrian Howard - Travel Advisor"
                  className="mx-auto mb-4 h-32 w-32 rounded-full object-cover"
                  src={foraProfile}
                />
                <CardTitle className="text-xl">Travel Advising</CardTitle>
                <p className="text-muted-foreground mb-2 text-sm">
                  Independent Certified Fora Travel Advisor
                </p>
                <CardDescription>
                  Culture enthusiast and geek at heart! Crafting immersive
                  travel experiences that let you see the world like a local.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center text-sm">
                  Specializing in Japan • Solo trips • Budget optimization
                </p>
              </CardContent>
            </Card>
          </a>

          {/* Pet Care Card */}
          <a
            className="group"
            href="https://www.rover.com/sit/aydrih08941"
            rel="noopener noreferrer"
            target="_blank"
          >
            <Card className="h-full cursor-pointer transition-all hover:scale-[1.02] hover:shadow-lg">
              <CardHeader className="text-center">
                <img
                  alt="Aydrian Howard - Pet Care Provider"
                  className="mx-auto mb-4 h-32 w-32 rounded-full object-cover"
                  src={roverProfile}
                />
                <CardTitle className="text-xl">Pet Care</CardTitle>
                <p className="text-muted-foreground mb-2 text-sm">via Rover</p>
                <CardDescription>
                  20 years of pet care experience in New York, NY. Very kind and
                  responsible with your furry friends.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center">
                  <span className="bg-primary/10 text-primary inline-block rounded-full px-3 py-1 text-sm font-medium">
                    $20 off your first booking
                  </span>
                </p>
                <p className="text-muted-foreground mt-2 text-center text-sm">
                  ⭐ 5-star rating • Enhanced background check
                </p>
                <p className="mt-4 text-center">
                  <Link
                    className="text-primary hover:underline"
                    to="/atticus-list"
                  >
                    Check out Atticus&apos;s Favorite Things →
                  </Link>
                </p>
              </CardContent>
            </Card>
          </a>
        </div>
      </div>
    </>
  );
}
