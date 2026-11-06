"use client";

import PageSectionsView, {personalSections} from "@/components/PageSectionsView";

export default function PersonalPage() {
    return <PageSectionsView type="personal" sections={personalSections}/>;
}
